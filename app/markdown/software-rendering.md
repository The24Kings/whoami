---
image: /article/penger.png
title: One Formula That Demystifies 3D Graphics
date: 12/30/25
tags: [OpenGL, Rust, Projection Mapping]
desc: The beauty of a simple, yet powerful, equation for mapping 3D into a 2D space.
---

<!-- markdownlint-disable-next-line MD025 -->
# Overview

- <https://github.com/The24Kings/WireframeRenderer>
- Heavily inspired by [Tsoding](https://www.youtube.com/watch?v=qjWkNZ0SXfo)
- 3D point: `[x, y, z]` -> 2D point: `[x, y]` projection

$$
\begin{aligned}
x' &= \frac{x}{z} \\
\\
y' &= \frac{y}{z}
\end{aligned}
$$

Convert to point coordinates

```RUST
pub fn project(&self) -> Point2D {
    match self.z {
        0.0 => Point2D::new(0.0, 0.0),
        _ => Point2D::new(self.x / self.z, self.y / self.z),
    }
}

// Ortho is just 1:1, ignoring the z axis
pub fn ortho(&self) -> Point2D {
    Point2D::new(self.x, self.y)
}
```

![Point Coordinates](/figures/point_coordinates.png)

- Convert point coordinate to screen coordinate
  - You need to map it the size of your drawn screen since a point is `-1..1` after our formula
  - This works because our canvas is already has the origin in the center of the screen. Other maths
  would need to be applied if this was top-left origin

```RUST
pub fn screen(&self) -> Point2D {
    Point2D {
        x: self.x * (CANVAS_WIDTH / 2.0),
        y: self.y * (CANVAS_HEIGHT / 2.0),
    }
}
```

![Screen Coordinates](/figures/screen_coordinates.png)

- Near plane and far plane, if a dot stop rendering that means its "behind" the camera
- Apply everything in order, trig functions on 3D points before converting to 2D points

```RUST
 // Apply translation, rotation, (scale), and projection to all vertices
let points: Vec<Point2D> = vs
    .par_iter()
    .map(|v| v.rotate_y(angle).translate_z(dz).project().screen())
    .collect();
```

- Simple transform chain, not a full model/world/view/projection pipeline
- No camera basis, matrices, or dot/cross products for arbitrary local axes
- Mesh starts around origin, so rotation spins it in place before translation
- Translation moves the rotated points into camera/view space
- Projection must happen after translation because it depends on final depth

- Since the mesh starts centered around origin, rotation happens around the model/origin first, then translation moves it into camera space.

- Rotation is done via trigonometric rotations over matrix rotation or quaternions.
- This is a `counter-clockwise` z-axis rotation

$$
\begin{bmatrix}
x' \\
y'
\end{bmatrix}
=
\begin{bmatrix}
\cos\theta & -\sin\theta \\
\sin\theta & \cos\theta
\end{bmatrix}
\begin{bmatrix}
x \\
y
\end{bmatrix}
$$

- An actual rotation matrix (the identity matrix) would look like this
- This is also know as `Affine transformations`

$$
\begin{bmatrix}
\cos\theta & -\sin\theta & 0 \\
\sin\theta & \cos\theta & 0 \\
0 & 0 & 1
\end{bmatrix}
$$

- Which is what I end up doing in this function for a Z axis rotation

```RUST
pub fn rotate_z(&self, angle: f32) -> Self {
    let c = f32::cos(angle.to_radians());
    let s = f32::sin(angle.to_radians());

    Self {
        x: self.x * c - self.y * s,
        y: self.x * s + self.y * c,
        z: self.z,
    }
}
```

- It doesn't make sense to to `z: self.z * 1.0` so `1.0` is omitted

- Due to our simplistic coordinate space I can represent a translation by adding a delta to the given coordinate in 3D before applying 2D projections

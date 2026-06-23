import { useEffect } from 'react';

const NoPage = () => {
    useEffect(() => {
        document.title = "404";
    }, []);

    return (
        <>
            <div className="container">
                <h1 className="error">404</h1>
                <p>Sorry this page does not exist!</p>
            </div>
        </>
    );
};

export default NoPage;
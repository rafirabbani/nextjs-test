
export default function Layout({children, size}) {
    return (
        <div>
            <main>{children}</main>
            <footer>Footer Here</footer>
        </div>
    );
}


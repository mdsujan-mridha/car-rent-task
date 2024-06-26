

const Header = () => {
    return (
        <>
            <div>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
                    alt="company-logo"
                    height="100"
                    width="100"
                />
            </div>
            <div className="text-right">
                <p>Nyntax .</p>
                <p className="text-gray-500 text-sm">sales@nyntax.com,</p>
                <p className="text-gray-500 text-sm mt-1">+41-442341232</p>
                <p className="text-gray-500 text-sm mt-1">VAT: 8657671212</p>
            </div>
        </>
    );
};

export default Header;
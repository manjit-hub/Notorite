import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeStatus } from "../Redux/slices/theme-slice";

function ThemeToggleBtn() {
    const dispatch = useDispatch();
    const currentTheme = useSelector((state) => state.themeStatus);

    // Set default theme to "dark"
    const [theme, setTheme] = useState("dark");

    // Apply dark theme by default on mount
    useEffect(() => {
        const initialTheme = currentTheme || "dark"; // Default to "dark" if no theme is in state
        setTheme(initialTheme);
        document.querySelector("html").classList.add(initialTheme);
        dispatch(setThemeStatus(initialTheme)); // Ensure Redux state is updated to the initial theme
    }, [dispatch, currentTheme]);

    const handleToggle = (e) => {
        const newTheme = e.target.checked ? "dark" : "light";
        setTheme(newTheme);
        dispatch(setThemeStatus(newTheme));

        // Toggle theme classes on the html element
        document.querySelector("html").classList.remove("light", "dark");
        document.querySelector("html").classList.add(newTheme);
    };

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={theme === "dark"}
                className="sr-only"
                onChange={handleToggle}
            />
            <div className={`toggleSwitch ${theme === "dark" ? "bg-blue-600" : "bg-gray-200"}`}>
                <div 
                    className={`toggleSwitch-circle ${theme === "dark" ? "translate-x-full" : "translate-x-0"}`} 
                ></div>
            </div>
        </label>
    );
}

export default ThemeToggleBtn;

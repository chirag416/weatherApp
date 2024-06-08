import React, { useEffect } from 'react'
import { useState } from 'react';


const ThemeButton = () => {
    const [theme, setTheme] = useState('light'); // State to manage theme

  useEffect(() => {
    document.body.className = theme + "-theme";
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  return (
    <div className='theme-button'>
        <button onClick={toggleTheme}>Theme Change</button>
    </div>
  )
}

export default ThemeButton
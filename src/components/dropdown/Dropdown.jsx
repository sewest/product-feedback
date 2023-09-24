import { useState, useRef, useEffect } from "react";
import { useAppDispatch } from "../../context/AppContext";
import { getSelectedIndex, handleOptionClick, handleOptionKeyDown, handleButtonKeyDown, data } from "./dropdownHelpers";
import useWindowWidth from "../../hooks/useWindowWidth";
import Text from "../text/Text";
import styles from "./dropdown.module.css";

export default function Dropdown({ classes }) {
  const { label, selected, items } = data;
  const [isOpen, setIsOpen] = useState(false);
  const startingIndex = getSelectedIndex(selected, items);
  const [selectedText, setSelectedText] = useState(items[startingIndex].text);
  const dispatch = useAppDispatch();
  const windowWidth = useWindowWidth();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    dispatch({
      type: "SET_SORT_ORDER",
      payload: selectedText,
    });
  }, [selectedText]);

  return (
    <>
      <div className={`${styles.customSelect} ${isOpen && styles.active} ${classes}`}>
        {/* Render the label */}
        <Text size={windowWidth < 768 ? "sm" : "md"} id="select-label" className={styles.selectLabel}>
          {label}
        </Text>
        {/* Render the button */}
        <button
          ref={buttonRef}
          className={`${styles.selectButton} select-button`}
          onClick={() => setIsOpen(!isOpen)} // Toggle the isOpen state on button click
          role="combobox"
          aria-labelledby="select-label"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls="select-dropdown"
          tabIndex={0}
          onKeyDown={(e) => handleButtonKeyDown(e, setIsOpen, buttonRef, isOpen)} // Handle keyboard events for the button
          id="dropdown__select"
        >
          <span className={styles.selectedValue}>{selectedText}</span>
          <span className={styles.arrow}></span>
        </button>
        {/* Render the dropdown list */}
        <ul ref={dropdownRef} className={styles.selectDropdown} role="listbox" id="select-dropdown">
          {items.map((entry) => (
            <li
              key={entry.id}
              tabIndex={0}
              role="option"
              onClick={() => handleOptionClick(entry.text, setSelectedText, setIsOpen)} // Handle item selection on click
              onKeyDown={(e) => handleOptionKeyDown(e, entry.text, setSelectedText, setIsOpen, isOpen, dropdownRef, buttonRef)} // Handle keyboard events for the list items
              id={`${entry.id}`}
              className={`dropdown__item`}
            >
              <input type="radio" id={entry.id} name={entry.name} checked={entry.text === selectedText} onChange={() => {}} />
              <label htmlFor={entry.id}>
                {/* Render left and right icons if present */}
                {entry.leftIcon && <span className={styles.leftIcon}>{entry.leftIcon}</span>}
                {entry.text}
                {entry.rightIcon && <span className={styles.rightIcon}>{entry.rightIcon}</span>}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

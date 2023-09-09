import { useState, useRef } from "react";
import { getSelectedIndex, handleOptionClick, handleOptionKeyDown, handleButtonKeyDown } from "./dropdownHelpers";
import styles from "./dropdown.module.css";

/**
 * Renders a dropdown component with a label, button, and list of items.
 *
 * @return {JSX.Element} The rendered dropdown component.
 */
export default function Dropdown() {
  const { label, selected, items } = data;
  const [isOpen, setIsOpen] = useState(false);
  const startingIndex = getSelectedIndex(selected, items);
  const [selectedText, setSelectedText] = useState(items[startingIndex].text);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  return (
    <>
      <div className={`${styles.customSelect} ${isOpen && styles.active}`}>
        <p id="select-label" className={styles.selectLabel}>
          {label}
        </p>
        <button
          ref={buttonRef}
          className={`${styles.selectButton} select-button`}
          onClick={() => setIsOpen(!isOpen)}
          role="combobox"
          aria-labelledby="select-label"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls="select-dropdown"
          tabIndex={0}
          onKeyDown={(e) => handleButtonKeyDown(e, setIsOpen, buttonRef, isOpen)}
          id="dropdown__select"
        >
          <span className={styles.selectedValue}>{selectedText}</span>
          <span className={styles.arrow}></span>
        </button>
        <ul ref={dropdownRef} className={styles.selectDropdown} role="listbox" id="select-dropdown">
          {items.map((entry) => (
            <li
              key={entry.id}
              tabIndex={0}
              role="option"
              onClick={() => handleOptionClick(entry.text, setSelectedText, setIsOpen)}
              onKeyDown={(e) => handleOptionKeyDown(e, entry.text, setSelectedText, setIsOpen, isOpen, dropdownRef, buttonRef)}
              id={`${entry.id}`}
              className={`dropdown__item`}
            >
              <input type="radio" id={entry.id} name={entry.name} checked={entry.text === selectedText} onChange={() => {}} />
              <label htmlFor={entry.id}>
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

const data = {
  label: "Sort by : ",
  selected: "mostUpvotes",
  items: [
    {
      id: "mostUpvotes",
      text: "Most Upvotes",
      name: "suggestionFilter",
      leftIcon: null,
      rightIcon: null,
    },
    {
      id: "leastUpvotes",
      text: "Least Upvotes",
      name: "suggestionFilter",
      leftIcon: null,
      rightIcon: null,
    },
    {
      id: "mostComments",
      text: "Most Comments",
      name: "suggestionFilter",
      leftIcon: null,
      rightIcon: null,
    },
    {
      id: "leastComments",
      text: "Least Comments",
      name: "suggestionFilter",
      leftIcon: null,
      rightIcon: null,
    },
  ],
};

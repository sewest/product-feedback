import { useState, useRef } from "react";
import { ReactComponent as ArrowIcon } from "../../assets/icons/iconArrowDown.svg";
import useWindowWidth from "../../hooks/useWindowWidth";
import Text from "../text/Text";
import styles from "./dropdown.module.css";

export default function Dropdown({ classes, data, type, value, setValue }) {
  const { label, items } = data;
  const [isOpen, setIsOpen] = useState(false);
  const windowWidth = useWindowWidth();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const combinedClasses = `${styles[type]} ${isOpen && styles.active} ${classes}`;

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={combinedClasses}>
        {/* Render the label */}
        <Text size={windowWidth < 768 ? "sm" : "md"} id="select-label" className={styles.selectLabel}>
          {label}
        </Text>
        {/* Render the button */}
        <button
          ref={buttonRef}
          className={`${styles.selectButton} select-button`}
          onClick={(e) => handleClick(e)} // Toggle the isOpen state on button click
          role="combobox"
          aria-labelledby="select-label"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls="select-dropdown"
          tabIndex={0}
          onKeyDown={(e) => handleButtonKeyDown(e, setIsOpen, buttonRef, isOpen)} // Handle keyboard events for the button
          id="dropdown__select"
        >
          <span className={styles.selectedValue}>{value}</span>
          <ArrowIcon className={styles.arrow}></ArrowIcon>
        </button>
        {/* Render the dropdown list */}
        <ul ref={dropdownRef} className={styles.selectDropdown} role="listbox" id="select-dropdown">
          {items.map((entry) => (
            <li
              key={entry.id}
              tabIndex={0}
              role="option"
              onClick={() => handleOptionClick(entry.text, setValue, setIsOpen)} // Handle item selection on click
              onKeyDown={(e) => handleOptionKeyDown(e, entry.text, setValue, setIsOpen, isOpen, dropdownRef, buttonRef)} // Handle keyboard events for the list items
              id={`${entry.id}`}
              className={`dropdown__item`}
            >
              <input type="radio" id={entry.id} name={entry.name} checked={entry.text === value} onChange={setValue} />
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

const ENTER_KEY_CODE = 13;
const DOWN_ARROW_KEY_CODE = 40;
const UP_ARROW_KEY_CODE = 38;
const ESCAPE_KEY_CODE = 27;
const TAB_KEY_CODE = 9;

export const focusNextListItem = (direction) => {
  const activeElementId = document.activeElement.id; // Get the id of the currently active element
  const listItems = document.querySelectorAll(".dropdown__item"); // Get all elements with the class "dropdown__item"
  const listItemIds = Array.from(listItems).map((item) => item.id); // Create an array of ids from the list items

  // If we're on the select button itself, move to the first list item.
  if (activeElementId === "dropdown__select") {
    listItems[0].focus(); // Focus on the first list item
  } else {
    // Get the index of the active element
    const currentActiveElementIndex = listItemIds.indexOf(activeElementId);

    // If this isn't the last element, go ahead and focus on the next element.
    if (direction === DOWN_ARROW_KEY_CODE) {
      const currentActiveElementIsNotLastItem = currentActiveElementIndex < listItemIds.length - 1;
      if (currentActiveElementIsNotLastItem) {
        const nextListItemId = listItemIds[currentActiveElementIndex + 1];
        document.querySelector(`#${nextListItemId}`).focus(); // Focus on the next list item
      }
    }
    // If we're not on the first item, move up the list.
    else if (direction === UP_ARROW_KEY_CODE) {
      const currentActiveElementIsNotFirstItem = currentActiveElementIndex > 0;
      if (currentActiveElementIsNotFirstItem) {
        const previousListItemId = listItemIds[currentActiveElementIndex - 1];
        document.querySelector(`#${previousListItemId}`).focus(); // Focus on the previous list item
      }
      // Otherwise, if we are on the top list item, move focus back to the select button.
      else {
        document.getElementById("dropdown__select").focus(); // Focus on the select button
      }
    }
  }
};

export const handleOptionClick = (text, setValue, setIsOpen) => {
  //Set the selected text as the text of the clicked option and close the dropdown
  setValue(text);
  setIsOpen(false);
};

export const handleButtonKeyDown = (e, setIsOpen, buttonRef, isOpen) => {
  // Close the dropdown if the escape key is pressed
  if (e.keyCode === ESCAPE_KEY_CODE) {
    setIsOpen(false);
  }
  // If the tab key is pressed while the button is focused and the dropdown is closed, move to the next DOM element after the list items
  else if (e.keyCode === TAB_KEY_CODE && buttonRef.current === document.activeElement && !isOpen) {
    const nextElement = buttonRef.current.nextElementSibling;
    if (nextElement) {
      nextElement.focus();
    }
  }
  // Call the focusNextListItem function if the down or up arrow keys are pressed
  else if (e.keyCode === DOWN_ARROW_KEY_CODE && isOpen) {
    focusNextListItem(DOWN_ARROW_KEY_CODE);
  } else if (e.keyCode === UP_ARROW_KEY_CODE && isOpen) {
    focusNextListItem(UP_ARROW_KEY_CODE);
  }
};
export const handleOptionKeyDown = (e, text, setValue, setIsOpen, isOpen, dropdownRef, buttonRef) => {
  // If an option is selected with the enter key, close the dropdown and set the selected text
  if (e.keyCode === ENTER_KEY_CODE) {
    setValue(text);
    setIsOpen(false);
  }
  // If the down or up arrow keys are pressed, move focus to the next list item
  else if (e.keyCode === DOWN_ARROW_KEY_CODE) {
    e.preventDefault(); // Prevents window scrolling
    focusNextListItem(DOWN_ARROW_KEY_CODE);
  } else if (e.keyCode === UP_ARROW_KEY_CODE) {
    e.preventDefault(); // Prevents window scrolling
    focusNextListItem(UP_ARROW_KEY_CODE);
  }
  // If the escape key is pressed, close the dropdown
  else if (e.keyCode === ESCAPE_KEY_CODE) {
    setIsOpen(false);
  }
  // If the dropdown is closed and the tab key is pressed, move to the next DOM element after the list items.
  else if (e.keyCode === TAB_KEY_CODE) {
    if (!isOpen) {
      const nextElement = buttonRef.current.nextElementSibling;
      if (nextElement) {
        nextElement.focus();
      }
    }
    // If the list is open, move to the next item.
    else {
      const listItems = dropdownRef.current.querySelectorAll(".dropdown__item");
      const lastListItem = listItems[listItems.length - 1];
      // If it's the last item in the list, close it and move on.
      if (document.activeElement === lastListItem) {
        setIsOpen(false);
        const nextElement = buttonRef.current.nextElementSibling;
        if (nextElement) {
          nextElement.focus();
        }
      }
    }
  }
};

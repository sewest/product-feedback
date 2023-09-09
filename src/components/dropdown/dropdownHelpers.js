//TODO: The tab behavior here still isn't exactly right. When the dropdown is closed, tabbing will cycle through all the list items before moving on to the next element.
//TODO: Clean this up. Single responsibility principle. These functions are bloated.
//TODO: When using the arrows, they capture the vertical scrollbars. Prevent bubbling

const ENTER_KEY_CODE = 13;
const DOWN_ARROW_KEY_CODE = 40;
const UP_ARROW_KEY_CODE = 38;
const ESCAPE_KEY_CODE = 27;
const TAB_KEY_CODE = 9;

/**
 * Returns the index of the selected item in the given array of items or returns 0 if the selected item is not found.
 *
 * @param {string} selected - The ID of the selected item.
 * @param {Array} items - The array of items.
 * @return {number} The index of the selected item. If the selected item is not found, returns 0.
 */
export const getSelectedIndex = (selected, items) => {
  //Default to the first item.
  if (!selected) {
    return 0;
  }
  //Get the index of the selected item if there is a selected item.
  const selectedIndex = items.findIndex((item) => item.id === selected);
  //Return 0 if the selected item is not found, and provide an error message for the user.
  if (selectedIndex === -1) {
    console.error("The provided value for 'selected' is invalid.");
    return 0;
  }

  return selectedIndex;
};

/**
 * Focuses on the next list item in a dropdown menu based on the given direction.
 *
 * @param {string} direction - The direction to navigate the list items. Accepts "up" or "down".
 * @return {void} This function does not return a value.
 */
export const focusNextListItem = (direction) => {
  const activeElementId = document.activeElement.id;
  const listItems = document.querySelectorAll(".dropdown__item");
  const listItemIds = Array.from(listItems).map((item) => item.id);

  //If we're on the select button itself, move to the first list item.
  if (activeElementId === "dropdown__select") {
    listItems[0].focus();
  } else {
    //Get the index of the active element
    const currentActiveElementIndex = listItemIds.indexOf(activeElementId);
    //If this isn't the last element, go ahead and focus on the next element.
    if (direction === DOWN_ARROW_KEY_CODE) {
      const currentActiveElementIsNotLastItem = currentActiveElementIndex < listItemIds.length - 1;
      if (currentActiveElementIsNotLastItem) {
        const nextListItemId = listItemIds[currentActiveElementIndex + 1];
        document.querySelector(`#${nextListItemId}`).focus();
      }
    }
    //If we're not on the first item, move up the list.
    else if (direction === UP_ARROW_KEY_CODE) {
      const currentActiveElementIsNotFirstItem = currentActiveElementIndex > 0;
      if (currentActiveElementIsNotFirstItem) {
        const previousListItemId = listItemIds[currentActiveElementIndex - 1];
        document.querySelector(`#${previousListItemId}`).focus();
      }
      //Otherwise, if we are on the top list item, move focus back to the select button.
      else {
        document.getElementById("dropdown__select").focus();
      }
    }
  }
};

/**
 * Handles the click event for an option.
 *
 * @param {string} text - The text of the clicked option.
 * @param {function} setSelectedText - A function to set the selected text.
 * @param {function} setIsOpen - A function to set the isOpen state.
 */
export const handleOptionClick = (text, setSelectedText, setIsOpen) => {
  //Set the selected text as the text of the clicked option and close the dropdown
  setSelectedText(text);
  setIsOpen(false);
};

/**
 * Handles the keydown event on the button element.
 *
 * @param {Event} e - The keydown event object.
 * @param {function} setIsOpen - A function to set the isOpen state.
 * @param {React.RefObject} buttonRef - A reference to the button element.
 * @param {boolean} isOpen - A boolean indicating if the button is open.
 */
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

/**
 * Handles the key down event for options in the dropdown.
 *
 * @param {Event} e - The key down event object.
 * @param {string} text - The text of the option.
 * @param {function} setSelectedText - A function to set the selected text.
 * @param {function} setIsOpen - A function to set the open state of the dropdown.
 * @param {boolean} isOpen - The current open state of the dropdown.
 * @param {object} dropdownRef - A ref to the dropdown element.
 * @param {object} buttonRef - A ref to the button element.
 */
export const handleOptionKeyDown = (e, text, setSelectedText, setIsOpen, isOpen, dropdownRef, buttonRef) => {
  // If an option is selected with the enter key, close the dropdown and set the selected text
  if (e.keyCode === ENTER_KEY_CODE) {
    setSelectedText(text);
    setIsOpen(false);
  }
  // If the down or up arrow keys are pressed, move focus to the next list item
  else if (e.keyCode === DOWN_ARROW_KEY_CODE) {
    focusNextListItem(DOWN_ARROW_KEY_CODE);
  } else if (e.keyCode === UP_ARROW_KEY_CODE) {
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

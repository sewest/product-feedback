const ENTER_KEY_CODE = 13;
const DOWN_ARROW_KEY_CODE = 40;
const UP_ARROW_KEY_CODE = 38;
const ESCAPE_KEY_CODE = 27;
const TAB_KEY_CODE = 9;

export const data = {
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

export const getSelectedIndex = (selected, items) => {
  // Default to the first item.
  if (!selected) {
    return 0;
  }
  // Get the index of the selected item if there is a selected item.
  const selectedIndex = items.findIndex((item) => item.id === selected);
  // Return 0 if the selected item is not found, and provide an error message for the user.
  if (selectedIndex === -1) {
    console.error("The provided value for 'selected' is invalid.");
    return 0;
  }

  return selectedIndex;
};

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

export const handleOptionClick = (text, setSelectedText, setIsOpen) => {
  //Set the selected text as the text of the clicked option and close the dropdown
  setSelectedText(text);
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
export const handleOptionKeyDown = (e, text, setSelectedText, setIsOpen, isOpen, dropdownRef, buttonRef) => {
  // If an option is selected with the enter key, close the dropdown and set the selected text
  if (e.keyCode === ENTER_KEY_CODE) {
    setSelectedText(text);
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

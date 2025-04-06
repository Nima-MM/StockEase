/**
 * Composable to update an attribute of a product or any object.
 * @param optionsRef - Reference to the list of options (e.g., colors, brands, categories)
 * @param targetRef - Reference to the target object that needs updating
 * @param attribute - The attribute in the target that should be updated
 */
export function useAttributeUpdater<T extends { name: string }>(optionsRef: any, targetRef: any, attribute: string) {
  // console.log('useAttributeUpdater', attribute);
  const updateAttribute = (name: string) => {
    console.log('optionsRef', optionsRef.value);
    const options = optionsRef.value;
    if (options) {
      console.log('options', options);
      const selectedOption = options.find((option: T) => option.name === name);
      if (selectedOption) {
        targetRef.value[attribute] = { id: selectedOption.id, name: selectedOption.name };
      }
    }
  };
  // console.log('updateAttribute', updateAttribute);
  return {
    updateAttribute,
  };
}

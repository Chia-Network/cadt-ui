export const formatToDataTimeFromSeconds = (seconds: number): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date(seconds * 1000))
}

export function jsonToPlainText(json, title = 'Main Group', prefix = '', isRoot = true) {
  let result = isRoot ? `${title}` : '';
  let arrayGroups = '';
  let subGroupPrefix = prefix + '  '; // Manage indentation for sub-groups

  // Iterate through each key in the JSON object
  // @ts-ignore
  Object.keys(json).forEach((key, index, array) => {
      const value = json[key];
      // Check if the value is an array
      if (Array.isArray(value)) {
          // Handle arrays, specifically arrays of objects as sub-groups
          let arrayTitle = `${key.toUpperCase()} GROUP`;
          arrayGroups += `${prefix}${arrayTitle}:\n`;
          value.forEach((item, idx) => {
              let itemPrefix = `${subGroupPrefix}${arrayTitle} [${idx}]:\n`;
              if (typeof item === 'object' && item !== null) {
                  // If the item is an object, recurse to print its properties with an index
                  arrayGroups += itemPrefix + jsonToPlainText(item, subGroupPrefix + '  ', false, title);
              } else {
                  // For arrays of primitive types, print directly with an index
                  arrayGroups += `${subGroupPrefix}${itemPrefix} ${item}\n`;
              }
          });
          arrayGroups += '\n'; // Add a newline for spacing between groups
      } else if (typeof value === 'object' && value !== null) {
          // If the value is an object, recurse to handle nested properties without an index
          result += `${prefix}${key}:\n` + jsonToPlainText(value, subGroupPrefix, false, title);
      } else {
          // Append non-array, non-object values to the main group or current group
          result += `${prefix}${key}: ${value}\n`;
      }
  });

  return result + arrayGroups; // Combine results and array groups before returning
}

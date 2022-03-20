const nameParser = (name) => {
  switch (name) {
    case 'NOBLE':
      return 'Noble';

    case 'OUVRIER':
      return 'Ouvrier';

    case 'AMET':
      return 'Amet';

    default:
      return 'Inconnu';
  }
};

export default nameParser

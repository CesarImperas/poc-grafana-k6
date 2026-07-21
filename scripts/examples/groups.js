import { group } from 'k6';
import { get } from '../../utils/http.js';

// Diferenciação presente no relatório (results/groups.json)

export default function() {
  group('Home Page', () => {
    get('/');
  });

  group('Contacts', () => {
    get('/contacts.php');
  });
};

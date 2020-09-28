import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export default function obtenerTitulo(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'inicio';

  switch (routeName) {
    case 'inicio':
      return 'naranja';
    case 'buscador':
      return 'Buscar';
    case 'cupones':
      return 'Mis cupones';
    case 'favoritos':
      return 'Mis favoritos';
    case 'perfil':
      return 'Perfil';
  }
}

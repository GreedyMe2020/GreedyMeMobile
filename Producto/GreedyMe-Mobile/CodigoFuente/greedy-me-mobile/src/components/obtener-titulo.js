import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export default function obtenerTitulo(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Inicio';

  switch (routeName) {
    case 'Inicio':
      return 'Inicio';
    case 'Buscador':
      return 'Buscar';
    case 'Cupones':
      return 'Mis cupones';
    case 'Favoritos':
      return 'Mis favoritos';
    case 'Perfil':
      return 'Perfil';
  }
}

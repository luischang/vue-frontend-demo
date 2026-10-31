// Toda la configuración pública del frontend se lee aquí, en un solo lugar.
// Vite reemplaza import.meta.env.VITE_* por su valor LITERAL al compilar:
// cambiar la variable después del build no tiene ningún efecto.
export const config = {
  appName: import.meta.env.VITE_APP_NAME || 'Frontend Demo',
  appEnv: import.meta.env.VITE_APP_ENV || 'local',
  appVersion: import.meta.env.VITE_APP_VERSION || '0.0.0',
  welcomeMessage: import.meta.env.VITE_WELCOME_MESSAGE || 'Mensaje por defecto (no se definió VITE_WELCOME_MESSAGE)',
  mode: import.meta.env.MODE, // 'development' | 'production'
}

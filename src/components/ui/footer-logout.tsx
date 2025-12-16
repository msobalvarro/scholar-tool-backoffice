export const FooterLogout = () => {
  return (
    <footer className='py-6 text-center text-xs text-gray-400 dark:text-gray-600'>
      <p>© {new Date().getFullYear()} Sistema de Gestión Escolar. Todos los derechos reservados.</p>
      <div className='flex justify-center gap-4 mt-2'>
        <a className='hover:text-gray-600 dark:hover:text-gray-400' href='#'>Privacidad</a>
        <a className='hover:text-gray-600 dark:hover:text-gray-400' href='#'>Términos</a>
      </div>
    </footer>
  )
}
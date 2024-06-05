import { Link, useRouteError } from 'react-router-dom'

export const Error = () => {
    const error = useRouteError() as Error
    return (
        <div className='flex h-screen flex-col items-center justify-center gap-2'>
            <h1 className='text-4xl font-bold'> Whops algo aconteceu.../</h1>
            <p className='text-accent-foreground'>
                Algo aconteceu na aplicação abaixo você encontra mais detalhes:
            </p>
            <pre>{error.message || JSON.stringify(error)}</pre>
            <p>Voltar Para o <Link to='/' className='text-sky-500 dark:text-sky-400'>Dashboard</Link></p>
        </div>
    )
}
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Sobre o Projeto
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Um projeto fullstack moderno construído com Next.js, TypeScript, Tailwind CSS e Zod
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex justify-center mb-12">
            <div className="flex space-x-4">
              <Link
                href="/"
                className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                ← Voltar para Home
              </Link>
              <Link
                href="/users"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700"
              >
                Ver Usuários
              </Link>
            </div>
          </nav>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                TypeScript
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Tipagem estática para maior segurança e melhor experiência de desenvolvimento.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Zod Validation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Validação de dados robusta e type-safe com schemas declarativos.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Tailwind CSS
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Framework CSS utilitário para designs responsivos e modernos.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Next.js App Router
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Roteamento moderno e otimizado com App Router do Next.js 13+.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                API Integration
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Hooks customizados para integração eficiente com APIs REST.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Environment Config
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Configuração segura de variáveis de ambiente para diferentes ambientes.
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Stack Tecnológico
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Next.js 15',
                'TypeScript',
                'Tailwind CSS',
                'Zod',
                'Axios',
                'React 19',
                'Node.js 22',
                'ESLint'
              ].map((tech) => (
                <div
                  key={tech}
                  className="bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg text-center text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
              width={200}
              height={42}
          priority
        />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Projeto Fullstack
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Um projeto moderno construído com Next.js 15, TypeScript, Tailwind CSS, Zod e Node.js 22
          </p>
          {isAuthenticated && user && (
            <div className="bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg mb-8 max-w-md mx-auto">
              <p className="font-medium">Bem-vindo de volta, {user.name || user.email}!</p>
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm">Next.js 15</span>
            <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm">TypeScript</span>
            <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm">Tailwind CSS</span>
            <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm">Zod</span>
            <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm">Node.js 22</span>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Link
            href="/login"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-8"
          >
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Login
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Faça login para acessar suas tarefas e gerenciar seu dia a dia.
            </p>
          </Link>

          <Link
            href="/tasks"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-8"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Minhas Tarefas
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Gerencie suas tarefas diárias com sistema de autenticação completo.
            </p>
          </Link>

          <Link
            href="/about"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-8"
          >
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Sobre o Projeto
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Conheça as tecnologias utilizadas e as funcionalidades implementadas neste projeto fullstack.
            </p>
          </Link>

          <Link
            href="/contact"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-8"
          >
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Contato
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Formulário de contato com validação em tempo real usando Zod e interface responsiva.
            </p>
          </Link>
        </div>

        {/* Features Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Funcionalidades Implementadas
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Validação Zod</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Schemas type-safe para validação de dados</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Hooks API</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Hooks customizados para integração com API</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Autenticação</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Sistema completo de login e proteção de rotas</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Tailwind CSS</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Design responsivo e moderno</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">App Router</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Roteamento moderno do Next.js</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <a
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
              Documentação
        </a>
        <a
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
              GitHub
        </a>
        <a
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
              Next.js →
        </a>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Projeto desenvolvido com Next.js 15, TypeScript e Tailwind CSS
          </p>
      </footer>
      </div>
    </div>
  );
}

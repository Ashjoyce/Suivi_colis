#!/usr/bin/env node

/**
 * Script utilitaire pour développer Suivi Colis
 * Commandes: start, dev, test, clean
 */

import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isWindows = process.platform === 'win32';
const projectRoot = path.join(__dirname, '..');
const backendPath = path.join(projectRoot, 'backend');

const commands = {
  start: 'Démarrer en production',
  dev: 'Démarrer en développement (frontend + backend)',
  backend: 'Démarrer uniquement le backend',
  frontend: 'Démarrer uniquement le frontend',
  install: 'Installer toutes les dépendances',
  clean: 'Nettoyer les dépendances',
  test: 'Lancer les tests',
  help: 'Afficher cette aide'
};

function log(msg, type = 'info') {
  const colors = {
    info: '\x1b[36m',
    success: '\x1b[32m',
    error: '\x1b[31m',
    warn: '\x1b[33m',
    reset: '\x1b[0m'
  };
  console.log(`${colors[type]}${msg}${colors.reset}`);
}

function runCommand(cmd, args, cwd = projectRoot) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      shell: isWindows
    });

    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Commande échouée avec code ${code}`));
    });

    child.on('error', reject);
  });
}

async function handleCommand(cmd) {
  try {
    switch (cmd) {
      case 'install':
        log('📦 Installation des dépendances...');
        await runCommand('npm', ['install']);
        await runCommand('npm', ['install'], backendPath);
        log('✅ Installation réussie!', 'success');
        break;

      case 'dev':
        log('🚀 Démarrage en mode développement...');
        log('Frontend: http://localhost:5173');
        log('Backend: http://localhost:5000');
        log('Appuyez sur Ctrl+C pour arrêter\n');
        
        // Lancer frontend et backend en parallèle
        const frontend = spawn('npm', ['run', 'dev'], {
          cwd: projectRoot,
          stdio: 'inherit',
          shell: isWindows
        });

        const backend = spawn(isWindows ? 'cmd' : 'bash', 
          isWindows ? ['/c', 'cd backend && npm run dev'] : ['-c', 'cd backend && npm run dev'], 
          {
            cwd: projectRoot,
            stdio: 'inherit'
          }
        );

        process.on('SIGINT', () => {
          frontend.kill();
          backend.kill();
          process.exit(0);
        });
        break;

      case 'backend':
        log('🔌 Démarrage du backend...');
        await runCommand('npm', ['run', 'dev'], backendPath);
        break;

      case 'frontend':
        log('🎨 Démarrage du frontend...');
        await runCommand('npm', ['run', 'dev']);
        break;

      case 'start':
        log('📦 Démarrage en production...');
        await runCommand('npm', ['start']);
        break;

      case 'clean':
        log('🗑️  Nettoyage...');
        if (fs.existsSync(path.join(projectRoot, 'node_modules'))) {
          fs.rmSync(path.join(projectRoot, 'node_modules'), { recursive: true });
        }
        if (fs.existsSync(path.join(backendPath, 'node_modules'))) {
          fs.rmSync(path.join(backendPath, 'node_modules'), { recursive: true });
        }
        log('✅ Nettoyage réussi!', 'success');
        break;

      case 'test':
        log('🧪 Lancement des tests...');
        await runCommand('npm', ['test']);
        break;

      case 'help':
      default:
        log('\n📖 Aide Suivi Colis\n', 'info');
        log('Commandes disponibles:\n');
        Object.entries(commands).forEach(([cmd, desc]) => {
          console.log(`  npm run ${cmd.padEnd(12)} - ${desc}`);
        });
        log('\nExemples:\n');
        console.log('  npm run install    # Installer dépendances');
        console.log('  npm run dev        # Démarrer frontend + backend');
        console.log('  npm run backend    # Démarrer backend seul');
        console.log('  npm run frontend   # Démarrer frontend seul\n');
    }
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'error');
    process.exit(1);
  }
}

// Récupérer la commande
const cmd = process.argv[2] || 'help';
handleCommand(cmd);

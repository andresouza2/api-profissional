import dotenv from 'dotenv'
import path from 'node:path'
import fs from 'node:fs'

// Define ambiente
const NODE_ENV = process.env.NODE_ENV || 'development'

const root = process.cwd()

const envFiles = [`.env`, `.env.local`, `.env.${NODE_ENV}`]

for (const file of envFiles) {
  const filePath = path.resolve(root, file)

  if (fs.existsSync(filePath)) {
    dotenv.config({ path: filePath, override: true })
  }
}

console.log('🔧 Ambiente:', NODE_ENV)
console.log(
  '📄 Env carregados:',
  envFiles.filter((f) => fs.existsSync(path.resolve(root, f))),
)

#!/bin/bash

echo "📁 Creando estructura de frontend (src)..."

cd src || exit 1

# Crear carpetas
mkdir -p components pages

# Crear archivos base
touch components/Navbar.jsx
touch components/IconPicker.jsx

touch pages/Home.jsx
touch pages/Login.jsx
touch pages/SecondFactor.jsx
touch pages/Dashboard.jsx
touch pages/Transfer.jsx
touch pages/Profile.jsx

touch theme.js

echo "✅ Estructura creada con éxito"
tree -L 2

# Start with the latest Base Debian image
FROM mcr.microsoft.com/devcontainers/base:debian

ENV SHELL=/bin/bash

# Install Node.js 22.9.0 from NodeSource
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs=22.9.0* \
    && rm -rf /var/lib/apt/lists/* /usr/share/man /usr/share/doc /usr/share/info

# Install pnpm 
RUN npm install -g pnpm@9.12.1 \
    && pnpm setup \
    && rm -rf /root/.npm/tmp/*

# Ensure PNPM global bin directory is in the PATH
ENV PNPM_HOME="/home/vscode/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Add local node_modules/.bin to PATH
ENV PATH="./node_modules/.bin:$PATH"

# Set the working directory in the container
WORKDIR /workspace

# Command to run when starting the container
CMD ["/bin/bash"]

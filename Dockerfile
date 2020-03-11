# Mirror until official release 
# https://github.com/microsoft/playwright/blob/ec3ee660430336d47a309553981eb960e49c2ede/docs/docker/Dockerfile.bionic
FROM ubuntu:bionic

# 1. Install node12
RUN apt-get update && apt-get install -y curl && \
  curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
  apt-get install -y nodejs

# 2. Install WebKit dependencies
RUN apt-get install -y libwoff1 \
  libopus0 \
  libwebp6 \
  libwebpdemux2 \
  libenchant1c2a \
  libgudev-1.0-0 \
  libsecret-1-0 \
  libhyphen0 \
  libgdk-pixbuf2.0-0 \
  libegl1 \
  libnotify4 \
  libxslt1.1 \
  libevent-2.1-6 \
  libgles2 \
  libvpx5 \ 
  # qawolf
  libgles2 \
  libnotify4 \
  libglu1-mesa


# 3. Install Chromium dependencies

RUN apt-get install -y libnss3 \
  libxss1 \
  libasound2 \
  # qawolf
  libgbm1

# 4. Install Firefox dependencies

RUN apt-get install -y libdbus-glib-1-2 \
  # qawolf
  libxext6 \
  libxt6 \
  libxtst6

# qawolf
# Does not allow npm install
# # 5. Add user so we don't need --no-sandbox in Chromium
# RUN groupadd -r pwuser && useradd -r -g pwuser -G audio,video pwuser \
#   && mkdir -p /home/pwuser/Downloads \
#   && chown -R pwuser:pwuser /home/pwuser

# # 6. (Optional) Install XVFB if there's a need to run browsers in headful mode
# RUN apt-get install -y xvfb

# # Run everything after as non-privileged user.
# USER pwuser

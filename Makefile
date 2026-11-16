IMAGE_NAME := encountersite
ENV_FILE ?= environments/.deploy.env

.PHONY: deploy

# Optional .deploy.env values (shell syntax): IMAGE_TAG, DEPLOY_HOST, SSH_KEY_FILE, VITE_MEDIA_API_ORIGIN.
# SSH_KEY_FILE must be the private key file used by SSH, not its .pub file.
deploy:
	@set -eu; \
	if [ -f "$(ENV_FILE)" ]; then \
		set -a; . "$(ENV_FILE)"; set +a; \
	fi; \
	IMAGE_TAG=$${IMAGE_TAG:-}; \
	DEPLOY_HOST=$${DEPLOY_HOST:-}; \
	SSH_KEY_FILE=$${SSH_KEY_FILE:-}; \
	VITE_MEDIA_API_ORIGIN=$${VITE_MEDIA_API_ORIGIN:-}; \
	if [ -z "$$IMAGE_TAG" ]; then \
		printf 'Image tag [latest]: '; IFS= read -r IMAGE_TAG; \
		IMAGE_TAG=$${IMAGE_TAG:-latest}; \
	fi; \
	if [ -z "$$DEPLOY_HOST" ]; then \
		printf 'Remote host (user@host or user@IP): '; IFS= read -r DEPLOY_HOST; \
	fi; \
	if [ -z "$$SSH_KEY_FILE" ]; then \
		printf 'SSH private key file: '; IFS= read -r SSH_KEY_FILE; \
	fi; \
	if [ -z "$$VITE_MEDIA_API_ORIGIN" ]; then \
		printf 'Media API origin: '; IFS= read -r VITE_MEDIA_API_ORIGIN; \
	fi; \
	if [ -z "$$DEPLOY_HOST" ]; then echo 'Remote host is required.' >&2; exit 1; fi; \
	if [ ! -r "$$SSH_KEY_FILE" ]; then echo "SSH key is not readable: $$SSH_KEY_FILE" >&2; exit 1; fi; \
	if [ -z "$$VITE_MEDIA_API_ORIGIN" ]; then echo 'Media API origin is required.' >&2; exit 1; fi; \
	command -v docker >/dev/null || { echo 'docker is required.' >&2; exit 1; }; \
	command -v scp >/dev/null || { echo 'scp is required.' >&2; exit 1; }; \
	IMAGE="$(IMAGE_NAME):$$IMAGE_TAG"; \
	ARCHIVE="$(IMAGE_NAME)-$$IMAGE_TAG.tar"; \
	docker build --build-arg "VITE_MEDIA_API_ORIGIN=$$VITE_MEDIA_API_ORIGIN" -f Dockerfile.nginx -t "$$IMAGE" .; \
	docker save -o "$$ARCHIVE" "$$IMAGE"; \
	sudo scp -i "$$SSH_KEY_FILE" "$$ARCHIVE" "$$DEPLOY_HOST:~/images"; \
	printf 'Copied %s to %s:~/%s/images\n' "$$ARCHIVE" "$$DEPLOY_HOST" "$$ARCHIVE"

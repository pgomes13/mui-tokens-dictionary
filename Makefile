.PHONY: help install build clean rebuild

help:
	@echo "Usage: make <target>"
	@echo ""
	@echo "  install   Install dependencies"
	@echo "  build     Build token outputs (CSS, JS, TS)"
	@echo "  clean     Remove build artifacts"
	@echo "  rebuild   Clean then build"

install:
	npm install

build:
	npm run build

clean:
	rm -rf build/

rebuild: clean build

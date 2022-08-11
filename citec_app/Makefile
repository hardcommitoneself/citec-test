help:
	@echo "| ------------------------------------------------------------------------------------------------------- |"
	@echo "|    CITEC APP"
	@echo "| ------------------------------------------------------------------------------------------------------- |"
	@echo "make check_reqs"
	@echo "make install_tools"
	@echo "make check_prettier"
	@echo "make check_eslint"
	@echo "make check_vulnerabilities"
	@echo "make license"
	@echo "make prefixes"
	@echo "make build_docs"
	@echo "make tests"
	@echo "make run"
	@echo "make checks"

install_tools:
	@npm install eslint --save-dev
	@npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier
	@npm install --save-dev audit-ci
	@npm install --save-dev jsdoc

check_reqs:
	@npm install

check_prettier:
	@npx prettier --check **/*.ts **/*.tsx

check_eslint:
	@npx eslint src/**/*.ts src/**/*.tsx

check_vulnerabilities:
	@npx audit-ci --critical

license:
	@python ../support/check_license.py ../citec_app/src

prefixes:
	@echo "Is prefix in name branch?"
	${IS_PREFIXED}

tests:
	@npm test -- --coverage -update --watchAll=false

build_docs:
	@npx jsdoc src/* -d docs

build_app:
	@npm run build

run:
	@npm start

checks:
	@make check_reqs
	@make check_prettier
	@make check_eslint
	@make check_vulnerabilities
	@make license
	@make prefixes
	@make build_docs
	@make tests


IS_PREFIXED := false
ifeq ($(GITHUB_BRANCH),)
	GITHUB_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
endif
ifneq (,$(findstring feature/,${GITHUB_BRANCH}))
	IS_PREFIXED=true
endif
ifneq (,$(findstring bugfix/,${GITHUB_BRANCH}))
	IS_PREFIXED=true
endif
ifneq (,$(findstring release/,${GITHUB_BRANCH}))
	IS_PREFIXED=true
endif
ifneq (,$(findstring develop,${GITHUB_BRANCH}))
	IS_PREFIXED=true
endif
ifneq (,$(findstring main,${GITHUB_BRANCH}))
	IS_PREFIXED=true
endif
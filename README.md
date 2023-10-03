### Hexlet tests and linter status:
[![Node CI](https://github.com/inasekin/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/inasekin/frontend-project-46/actions/workflows/nodejs.yml)
[![Actions Status](https://github.com/inasekin/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/inasekin/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/ee7773d47944bd17e54c/maintainability)](https://codeclimate.com/github/inasekin/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ee7773d47944bd17e54c/test_coverage)](https://codeclimate.com/github/inasekin/frontend-project-46/test_coverage)

# Difference Generator

## **Description:**
Gendiff is a utility compares two configuration files and shows a difference.

## **How it works:**
The program defines a difference between structures of two files. Accepted extentions for input are yaml and json. Output formats are plain, JSON and stylish as default. For help type:
```bash
gendiff -h
```

## Setup

```bash
git clone https://github.com/inasekin/frontend-project-46
```

```bash
cd frontend-project-46
```

```bash
make install
```

## **Usage:**
```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
```

## Asciinems

Compare simple json files
[![asciicast](https://asciinema.org/a/A6Cx30pSeeyWJSHCktzJ4eDzU.svg)](https://asciinema.org/a/A6Cx30pSeeyWJSHCktzJ4eDzU)

Compare nested json/yml files
[![asciicast](https://asciinema.org/a/zibxDARPgGXX02QGYZT5D1mPI.svg)](https://asciinema.org/a/zibxDARPgGXX02QGYZT5D1mPI)

Compare nested json/yml files with plain format
[![asciicast](https://asciinema.org/a/SpipjD1t2ibuVsjRaHQZyr1FT.svg)](https://asciinema.org/a/SpipjD1t2ibuVsjRaHQZyr1FT)

Compare nested json/yml files with json format
[![asciicast](https://asciinema.org/a/HE8m9N2TOXQ5qGkLG3LXGspQI.svg)](https://asciinema.org/a/HE8m9N2TOXQ5qGkLG3LXGspQI)

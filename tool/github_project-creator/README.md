# github_project_creator.py

## Prerequires

[Personal access tokens](https://github.com/settings/tokens)

## Usage

### コマンドラインツール

```bash
python github_project_creator.py -t ${TOKEN} -o ${OWNER} -r ${REPO} -p ${PROJECT_NAME}
```

### pip モジュール

```py
import github_project_creator

ret_val = github_project_creator.create_project(f'{TOKEN}', f'{OWNER}', f'{REPO}', f'{PROJECT_NAME}')
github_project_creator.create_columns(f'{TOKEN}', ret_val.json().id)
```

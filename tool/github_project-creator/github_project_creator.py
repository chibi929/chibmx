"""GitHub project creator."""
import argparse
import json

import requests

PARSER = argparse.ArgumentParser()
PARSER.add_argument('-t', '--token', help='Personal access tokens.', required=True)
PARSER.add_argument('-o', '--owner', help='Owner name.', required=True)
PARSER.add_argument('-r', '--repo', help='Repository name.', required=True)
PARSER.add_argument('-p', '--project-name', help='Project name.', required=True)


def __create_headers(token: str):
    """Create headers."""
    return {
        'Accept': 'application/vnd.github.inertia-preview+json',
        'Authorization': f'token {token}',
        'Content-Type': 'application/json'
    }


def create_columns(token: str, project_id: int):
    """POST /projects/:project_id/columns."""
    headers = __create_headers(token)
    for colmun in ['To do', 'In progress', 'Resolved', 'Done']:
        payload = {'name': colmun}
        ret_val = requests.post(
            f'https://api.github.com/projects/{project_id}/columns',
            data=json.dumps(payload),
            headers=headers
        )
        print(ret_val.status_code)


def create_project(token: str, owner: str, repo: str, project_name: str) -> requests.models.Response:
    """POST /repos/:owner/:repo/projects."""
    headers = __create_headers(token)
    payload = {'name': project_name}
    return requests.post(f'https://api.github.com/repos/{owner}/{repo}/projects', data=json.dumps(payload), headers=headers)


def main():
    """main."""
    token = PARSER.parse_args().token
    owner = PARSER.parse_args().owner
    repo = PARSER.parse_args().repo
    project_name = PARSER.parse_args().project_name

    # Project 作成
    ret_val = create_project(token, owner, repo, project_name)

    # Colums 作成
    project_id = ret_val.json().get('id')
    create_columns(token, project_id)


if __name__ == "__main__":
    main()

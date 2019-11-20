import axios, { AxiosPromise } from 'axios';

export class GitClient {
  private readonly baseUrl: string = 'https://api.github.com';

  constructor(private readonly token: string) {
    // TODO: Constructor が呼ばれるたびに増えちゃってる
    axios.interceptors.request.use((request) => {
      console.log(request.headers);
      request.headers = {
        Authorization: `token ${token}`,
        ...request.headers
      };
      console.log(request.headers);
      return request;
    });
  }

  fetchRepository(): AxiosPromise<object> {
    return axios.get(`${this.baseUrl}/user/repos?per_page=100`);
  }

  createRepositoryProject(owner: string, repo: string, projectName: string): AxiosPromise<object> {
    const headers = {
      Accept: 'application/vnd.github.inertia-preview+json'
    };
    const body = { name: projectName };
    return axios.post(`${this.baseUrl}/repos/${owner}/${repo}/projects`, body, { headers });
  }

  createProjectCard(projectId: number, columnName: string): AxiosPromise<object> {
    const headers = {
      Accept: 'application/vnd.github.inertia-preview+json'
    };
    const body = { name: columnName };
    return axios.post(`${this.baseUrl}/projects/${projectId}/columns`, body, { headers });
  }
}

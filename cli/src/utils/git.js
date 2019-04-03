import request from 'request';
import downloadGit from 'download-git-repo';
import {getAll} from "./rc";
import {DOWNLOAD_DIRECTORY} from "./constants";


let fetch = (url) => {
  return new Promise((resolve, reject) => {
    let config = {
      url,
      method: 'get',
      headers: {
        'user-agent': 'xxx',
      }
    };
    request(config, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
};

export let repoList = async () => {
  let config = await getAll();
  let api = `https://api.github.com/${config.type}/${config.registry}/repos`;
  return await fetch(api);
};

export let tagList = async (repo) => {
  let config = await getAll();
  let api = `https://api.github.com/repos/${config.type}/${repo}/tags`;
  api = `https://api.github.com/repos/zhufeng-cli/vue-template/tags`;
  return await fetch(api);
};

export let download = async (src, dest) => {
  return new Promise((resolve, reject) => {
    downloadGit(src, dest, error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

export let downloadLocal = async(project, version) => {
  let config = await getAll();
  let api = `${config.registry}/${project}`;
  if (version) {
    api += `#${version}`;
  }
  return await download(api, DOWNLOAD_DIRECTORY + '/' + project);
};


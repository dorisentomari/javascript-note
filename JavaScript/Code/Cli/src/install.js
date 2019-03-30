import ora from 'ora';
import inquirer from 'inquirer';
import {repoList, tagList, downloadLocal} from "./utils/git";
import {VERSION} from "./utils/constants";

let install = async () => {
  // 选择使用哪个模板
  // 通过配置文件获取模板的信息
  let loading = ora('fetching template...');
  loading.start();
  let list = await repoList();
  list = ['vue-template', 'react-template']
  loading.succeed();
  // list = list.map(({name}) => name);
  let answer = inquirer.prompt([
    {
      type: 'list',
      name: 'project',
      choices: list,
      questions: 'please choice a template'
    }
  ]);
  // 项目名字
  let project = answer.project;
  // 获取项目版本号
  loading = ora('fetching tag...');
  loading.start();
  list = await tagList(project);
  console.log(JSON.stringify(list))
  loading.succeed();
  list = list.map(({name}) => name);
  answer = inquirer.prompt([
    {
      type: 'list',
      name: 'tag',
      choices: list,
      questions: 'please choice a tag'
    }
  ]);
  let tag = answer.tag;
  console.log(tag);
  loading = ora('downloading...');
  loading.start();
  await downloadLocal(project, VERSION);
  loading.succeed();
};

export default install;

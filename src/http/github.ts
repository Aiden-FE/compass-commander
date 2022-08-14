import got from "got";
import {GithubReleases} from "./interfaces";

/**
 * @description 获取Github的仓库版本列表
 * @param username github用户名
 * @param repo 仓库名
 */
export function getRepoReleasesInGithub(username: string, repo: string) {
  return got.get(`https://api.github.com/repos/${username}/${repo}/releases`, {
    headers: {
      accept: 'application/vnd.github.v3+json',
    }
  }).json<GithubReleases[]>()
    .then(result => {
      // 过滤掉草稿版或者预发布版
      return result.filter(release => !release.draft && !release.prerelease);
    })
}

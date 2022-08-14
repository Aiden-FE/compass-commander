/** Github 版本数据项 */
export interface GithubReleases {
  id: string
  /** 发布名称 */
  name: string
  /** 标签名 */
  tag_name: string
  /** 发布描述 */
  body: string
  /** 是否草稿版 */
  draft: boolean
  /** 是否预发布 */
  prerelease: boolean
  created_at: string
  published_at: string
}

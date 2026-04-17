import { Octokit } from '@octokit/rest';
const OWNER = 'pgomes13';
const REPO = 'mui-tokens-dictionary';
export function createOctokit(pat) {
    return new Octokit({ auth: pat });
}
export async function validatePat(pat) {
    try {
        const octokit = createOctokit(pat);
        await octokit.rest.users.getAuthenticated();
        return true;
    }
    catch {
        return false;
    }
}
export async function createPrFromEdit(params) {
    const { pat, filePath, tokenPath, currentValue, newValue, prDescription } = params;
    const octokit = createOctokit(pat);
    const { data: mainRef } = await octokit.rest.git.getRef({ owner: OWNER, repo: REPO, ref: 'heads/main' });
    const mainSha = mainRef.object.sha;
    const branchName = `token-edit/${Date.now()}`;
    await octokit.rest.git.createRef({ owner: OWNER, repo: REPO, ref: `refs/heads/${branchName}`, sha: mainSha });
    const { data: fileData } = await octokit.rest.repos.getContent({
        owner: OWNER, repo: REPO, path: filePath, ref: branchName,
    });
    if (Array.isArray(fileData) || fileData.type !== 'file')
        throw new Error('Unexpected response from GitHub API');
    const currentContent = atob(fileData.content.replace(/\n/g, ''));
    const fileSha = fileData.sha;
    const parsed = JSON.parse(currentContent);
    let cursor = parsed;
    for (const segment of tokenPath.slice(0, -1)) {
        cursor = cursor[segment];
    }
    const lastKey = tokenPath[tokenPath.length - 1];
    cursor[lastKey].$value = newValue;
    const updatedContent = JSON.stringify(parsed, null, 2);
    await octokit.rest.repos.createOrUpdateFileContents({
        owner: OWNER, repo: REPO, path: filePath,
        message: `chore(tokens): update ${tokenPath.join('.')} to ${newValue}`,
        content: btoa(updatedContent),
        sha: fileSha,
        branch: branchName,
    });
    const body = prDescription ||
        `Updated \`${tokenPath.join('.')}\` from \`${currentValue}\` to \`${newValue}\`.\n\nCreated via MUI Token Dictionary UI.`;
    const { data: pr } = await octokit.rest.pulls.create({
        owner: OWNER, repo: REPO,
        title: `Token edit: ${tokenPath.join('.')}`,
        body,
        head: branchName,
        base: 'main',
    });
    return pr.html_url;
}

# Git and GitHub Syntax

## Version Control System
- Tracks changes in code.
- Git is the most popular, free, open-source, fast, and scalable VCS.
- It mainly helps us track history and collaborate.

## GitHub
- Used to store and manage code in Git.
- Creating a new repository is like creating a folder locally.
- While creating a repository, you can set:
  - Ownership
  - Repository name
  - Description
  - Private or public access
- You can also add a `README.md` file.
- `README.md` uses Markdown syntax and is commonly used for project descriptions.

## Commits
- A commit is usually a two-step process:
  1. Add
  2. Commit
- In GitHub, you can commit changes or cancel changes from the top-right area of the file editor.
- When committing, you can provide:
  - Commit message: version name of the commit
  - Description: extra details about the version

## Git Bash (Windows) / Terminal (Mac)
- `git --version` shows the installed Git version.
- `ls` lists visible files and directories.
- `ls -a` lists all files, including hidden ones.
- `pwd` shows the current working directory.
- `clear` clears the terminal screen.
- `cd <directory name>` changes the directory.

## Configuring Git
- `git config --global user.name "<My Name>"` sets your name.
- `git config --global user.email "<Email ID>"` sets your email.
- `git config --list` shows the stored Git configuration.
- Git configuration can be:
  - Global: for a single Git account
  - Local: for one repository
- `~` represents the root directory.

## Clone and Status
- Open a file in VS Code, then open the terminal.
- `git clone <repository link>` copies a remote repository to your local machine.
- You can get the clone link from the repository's Code button.
- `git status` shows the current state of the working directory.

## File Status
- **Modified**: existing file has been changed.
- **Untracked**: new file that Git is not tracking yet.
- **Staged**: file is ready to be committed.
- **Unmodified**: file has no changes.

## Add and Commit
- `git add <file name>` adds a changed file to the staging area.
- `git add .` stages all changed files.
- `git commit -m "<version message>"` records the staged changes.
- `git push origin main` uploads local changes to GitHub.
- `git log` shows the commit history.
- The first time you push from VS Code, it may ask you to authorize GitHub.

## Branching
- A branch lets different people or teams work on the same project in parallel without affecting the main branch.
- The main branch is often called `master` or `main`, and other branches are used for features.

## Init: Create a New Git Repository
- `git init` creates a new local repository.
- `git remote add origin <link>` connects the local repo to a remote GitHub repository.
- `git remote -v` verifies the remote connection.
- `git branch` shows the current branch.
- `git branch -M "<new name>"` renames the branch, often to `main`.
- `git push -u origin main` pushes the branch and sets the upstream.

## Branch Commands
- `git branch` shows the current branch.
- `git branch -M "<new name>"` renames a branch.
- `git checkout <branch name>` switches to a branch.
- `git checkout -b <new branch name>` creates and switches to a new branch.
- `git branch -d <branch name>` deletes a branch.

## Merging Branches: GitHub Pull Request
- Pull requests are used to merge branches in GitHub.
- The merge usually happens from:
  - Compare: feature branch
  - Base: main branch
- Add a title and description if needed.
- If conflicts appear, they must be resolved manually before merging.
- Completing the merge creates a commit.
- `git pull origin main` downloads changes from the remote repository to the local repository.

## Conflicts
- Conflicts happen when changes overlap in a way Git cannot resolve automatically.
- They must be fixed manually.

## Merging Branches: Git
- `git diff <branch name>` compares commits, branches, or files.
- `git merge <branch name>` merges another branch into the current branch.
- You stay on the current branch and mention the other branch name during merge.

## Undoing Changes: Staged Files
- `git reset <file name>` removes a file from the staging area.
- `git reset` can also be used to unstage changes.

## Undoing Changes: Single Commit
- `git reset HEAD~1` resets the latest commit.

## Undoing Changes: Multiple Commits
- `git reset <commit hash>` resets history up to a chosen commit.
- `git reset --hard <commit hash>` resets history and also resets the working code to that commit.

## Fork
- A fork is a new repository that shares code and visibility settings with the original upstream repository.
- It is basically a rough copy of another repository.
- You can fork a GitHub repository to your own account.
- Typically, the fork copies the main branch, though other branches may also be available.







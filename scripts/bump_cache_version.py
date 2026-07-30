#!/usr/bin/env python3
"""
Atualiza o parâmetro ?v=... nos links de css/style.css e js/*.js em todos
os arquivos HTML, mas SÓ quando esses arquivos de fato mudaram no commit
atual. Depois re-adiciona os HTMLs alterados ao commit automaticamente.

Roda sozinho via git hook (pre-commit) — não precisa executar manualmente.
"""
import re
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(
    subprocess.check_output(["git", "rev-parse", "--show-toplevel"], text=True).strip()
)

HTML_FILES = ["index.html", "sobre.html", "projetos.html", "contato.html"]
WATCHED_ASSETS = {"css/style.css", "js/script.js", "js/avatar.js"}

PATTERN = re.compile(r'(css/style\.css|js/script\.js|js/avatar\.js)(\?v=\d+)?(")')


def main() -> None:
    staged = subprocess.check_output(
        ["git", "diff", "--cached", "--name-only"], text=True
    ).splitlines()

    if not any(f in WATCHED_ASSETS for f in staged):
        # Nenhum CSS/JS mudou neste commit — não faz nada.
        return

    version = time.strftime("%Y%m%d%H%M")
    changed_files = []

    for name in HTML_FILES:
        path = ROOT / name
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8")
        new_text = PATTERN.sub(lambda m: f"{m.group(1)}?v={version}{m.group(3)}", text)
        if new_text != text:
            path.write_text(new_text, encoding="utf-8")
            changed_files.append(name)

    if changed_files:
        subprocess.run(["git", "add", *changed_files], cwd=ROOT, check=True)
        print(f"🔄 Cache-busting atualizado para v={version} em: {', '.join(changed_files)}")


if __name__ == "__main__":
    sys.exit(main())

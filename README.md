# InviteFriend

Projeto responsável pelas páginas e experiências web da campanha **InviteFriend**, incluindo as versões públicas utilizadas pela Shiver/Bullex.

O repositório contém diferentes páginas e assets da campanha, com desenvolvimento e validação local antes do envio das alterações via Pull Request.

---

## 🚀 Executando o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/Jersss/InviteFriend.git
```

Entre na pasta:

```bash
cd InviteFriend
```

---

### 2. Instale o `serve`

O projeto público pode ser executado utilizando o pacote `serve`.

Não é necessário instalar globalmente:

```bash
npx serve invitebull/public -l 3000
```

Caso seja solicitado:

```text
Need to install the following packages:
serve@14.x
Ok to proceed? (y)
```

Digite:

```text
y
```

---

## 🌐 Acessando o projeto

Com o servidor rodando na porta `3000`, acesse:

```text
http://localhost:3000/sharkprime/shark-prime
```

O terminal deve exibir algo semelhante a:

```text
Serving!

Local:    http://localhost:3000
Network:  http://192.168.x.x:3000
```

> Mantenha o terminal aberto enquanto estiver desenvolvendo.

---

## 📂 Estrutura principal

```text
InviteFriend/
│
├── documents/
├── invitebull/
│   ├── public/
│   └── package.json
│
├── sharkprime/
├── README.md
└── .gitignore
```

### `invitebull/public`

Contém os arquivos públicos utilizados pelo servidor local.

O comando:

```bash
npx serve invitebull/public -l 3000
```

deve ser executado **na raiz do repositório**.

---

## 🌿 Fluxo de desenvolvimento

Antes de começar uma alteração, atualize sua branch principal:

```bash
git pull
```

Crie uma nova branch:

```bash
git checkout -b nome-da-branch
```

Exemplo:

```bash
git checkout -b ajuste-shark-prime
```

Faça as alterações necessárias e valide o resultado localmente.

---

## 💻 Validação

Antes de enviar qualquer alteração, confira:

* Desktop;
* Mobile;
* Responsividade;
* Imagens e assets;
* Links;
* Textos;
* Espaçamentos;
* Elementos quebrados;
* Console do navegador.

A página principal utilizada para validação é:

```text
http://localhost:3000/sharkprime/shark-prime
```

---

## 📱 Teste mobile

Utilize o modo responsivo do navegador:

```text
F12 → Toggle Device Toolbar
```

Teste principalmente larguras próximas de:

```text
375px
390px
430px
```

Certifique-se de que nenhum conteúdo esteja:

* cortado;
* sobreposto;
* ultrapassando a tela;
* com imagens distorcidas.

---

## 📸 Antes e depois

Antes de realizar alterações visuais importantes, tire um print da versão atual.

Após finalizar, tire um novo print.

Os dois devem ser utilizados no Pull Request:

```text
ANTES
↓
print da versão original

DEPOIS
↓
print da nova versão
```

Isso facilita a revisão visual das alterações.

---

## ✅ Commit

Confira os arquivos modificados:

```bash
git status
```

Adicione as alterações:

```bash
git add .
```

Crie o commit:

```bash
git commit -m "Descrição da alteração"
```

Exemplo:

```bash
git commit -m "Ajusta layout da Shark Prime"
```

---

## ⬆️ Push

Na primeira vez que enviar a branch:

```bash
git push -u origin nome-da-branch
```

Exemplo:

```bash
git push -u origin ajuste-shark-prime
```

Nos próximos commits da mesma branch:

```bash
git push
```

---

## 🔀 Pull Request

Após o push:

1. Acesse o repositório no GitHub;
2. Abra um novo **Pull Request**;
3. Explique resumidamente o que foi alterado;
4. Adicione prints do **antes e depois**;
5. Aguarde a revisão.

### Exemplo

```text
Título:
Ajuste visual da página Shark Prime

Alterações:
- Ajuste de espaçamentos;
- Correção de imagens;
- Melhoria da responsividade;
- Atualização do layout da seção principal.

Validação:
✅ Desktop
✅ Mobile
✅ Assets
✅ Links

Antes:
[print]

Depois:
[print]
```

---

## ⚠️ Porta 3000 ocupada

Caso apareça:

```text
This port was picked because 3000 is in use.
```

descubra qual processo está utilizando a porta:

```bash
netstat -ano | findstr :3000
```

O último número exibido será o PID.

Encerre o processo:

```bash
taskkill /PID NUMERO_DO_PID /F
```

Depois rode novamente:

```bash
npx serve invitebull/public -l 3000
```

---

## 🖼️ Imagens não carregando

Caso apareça o ícone de imagem quebrada, verifique o caminho definido no `src`.

Por exemplo:

```html
<img src="/images/banner.png">
```

O arquivo precisa estar disponível dentro da pasta pública correspondente.

Utilize também:

```text
F12 → Network
```

e procure por erros:

```text
404 Not Found
```

---

## 🔄 Fluxo resumido

```text
Aceitar convite
      ↓
Clonar repositório
      ↓
Entrar em InviteFriend
      ↓
git pull
      ↓
Criar branch
      ↓
npx serve invitebull/public -l 3000
      ↓
Editar
      ↓
Testar desktop
      ↓
Testar mobile
      ↓
Comparar antes/depois
      ↓
git add .
      ↓
git commit
      ↓
git push
      ↓
Abrir Pull Request
```

---

## 🔗 Repositório

```text
https://github.com/Jersss/InviteFriend
```

---

## 📌 Regra principal

Não envie alterações diretamente sem antes:

**desenvolver → testar → comparar → commitar → abrir PR.**

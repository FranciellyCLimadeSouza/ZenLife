export function validarCPF(cpf) {
  const c = (cpf || "").replace(/\D/g, "");
  if (c.length !== 11 || /^(\d)\1+$/.test(c)) return false;
  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(c[i - 1]) * (11 - i);
  resto = (soma * 10) % 11; if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(c[9])) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(c[i - 1]) * (12 - i);
  resto = (soma * 10) % 11; if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(c[10]);
}

export function validarCadastro({ nomeCompleto, dataNascimento, endereco, cpf, email, senha }) {
  const erros = [];
  if (!nomeCompleto || nomeCompleto.length < 3) erros.push("nomeCompleto inválido");
  if (!dataNascimento) erros.push("dataNascimento obrigatório");
  if (!endereco) erros.push("endereco obrigatório");
  if (!cpf || !validarCPF(cpf)) erros.push("cpf inválido");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) erros.push("email inválido");
  if (!senha || senha.length < 6) erros.push("senha deve ter ao menos 6 caracteres");
  return erros;
}
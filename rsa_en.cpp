#include "gmp.h"
#include <iostream>
using namespace std;

mpz_t N, e, c, m;

string rsa_en(string N_str, string e_str, string m_str) {
  mpz_init(N);
  mpz_init(e);
  mpz_init(m);
  mpz_set_str(N, N_str.c_str(), 10);
  mpz_set_str(e, e_str.c_str(), 10);
  mpz_set_str(m, m_str.c_str(), 10);

  mpz_init(c);
  mpz_powm(c, m, e, N);
  mpz_clear(N);
  mpz_clear(e);
  mpz_clear(m);

  string c_str = mpz_get_str(NULL, 10, c);
  mpz_clear(c);
  return c_str;
}

int main() {
  string N_str, e_str, m_str;
  cin >> N_str >> e_str >> m_str;
  cout << rsa_en(N_str, e_str, m_str);
}

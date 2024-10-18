#include "gmp.h"
#include <iostream>
using namespace std;

mpz_t N, d, c, m;

string rsa_de(string N_str, string d_str, string c_str) {
  mpz_init(N);
  mpz_init(d);
  mpz_init(c);
  mpz_set_str(N, N_str.c_str(), 10);
  mpz_set_str(d, d_str.c_str(), 10);
  mpz_set_str(c, c_str.c_str(), 10);

  mpz_init(m);
  mpz_powm(m, c, d, N);
  mpz_clear(N);
  mpz_clear(d);
  mpz_clear(c);

  string m_str = mpz_get_str(NULL, 10, m);
  mpz_clear(m);
  return m_str;
}

int main() {
  string N_str, d_str, m_str;
  cin >> N_str >> d_str >> m_str;
  cout << rsa_de(N_str, d_str, m_str);
}

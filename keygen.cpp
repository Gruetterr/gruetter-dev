#include <gmp.h>
#include <iostream>
#include <stdio.h>
#include <string.h>
#include <string>
#include <time.h>
using namespace std;

mpz_t p, q, N, phip, phiq, phiN, d, e;

string get_N() {
  // Initialize RNG
  gmp_randstate_t state;
  gmp_randinit_mt(state);
  gmp_randseed_ui(state, time(NULL));

  int is_prime = 0;

  // Generate random p and q
  mpz_init(p);
  while (1) {
    mpz_urandomb(p, state, 1024);
    is_prime = mpz_probab_prime_p(p, 25);
    if (is_prime != 0)
      break;
  }

  mpz_init(q);
  while (1) {
    mpz_urandomb(q, state, 1024);
    is_prime = mpz_probab_prime_p(q, 25);
    if (is_prime != 0)
      break;
  }

  /*gmp_printf("Random p: %Zd\n", p);*/
  /*gmp_printf("Random q: %Zd\n", q);*/

  // Calculate N and phi(N)
  mpz_init(N);
  mpz_mul(N, p, q);

  mpz_init(phip);
  mpz_init(phiq);
  mpz_sub_ui(phip, p, 1);
  mpz_sub_ui(phiq, q, 1);
  mpz_clear(p);
  mpz_clear(q);

  mpz_init(phiN);
  mpz_mul(phiN, phip, phiq);

  mpz_clear(phip);
  mpz_clear(phiq);

  string N_str = mpz_get_str(NULL, 10, N);
  mpz_clear(N);
  return N_str;
}

string get_e() {
  // Initialize RNG
  gmp_randstate_t state;
  gmp_randinit_mt(state);
  gmp_randseed_ui(state, time(NULL));

  // Generate e
  mpz_t gcd_res;
  mpz_init(gcd_res);
  mpz_set_ui(gcd_res, 0);

  mpz_init(e);
  while (1) {
    mpz_urandomb(e, state, 1024);
    mpz_gcd(gcd_res, e, phiN);
    if (mpz_cmp_ui(gcd_res, 1) == 0) {
      /*gmp_printf("e found: %Zd\n", e);*/
      /*gmp_printf("The gcd of e and phiN is: %Zd\n", gcd_res);*/
      break;
    }
  }
  mpz_clear(gcd_res);

  string e_str = mpz_get_str(NULL, 10, e);
  return e_str;
}

string get_d() {
  mpz_init(d);
  mpz_invert(d, e, phiN);
  mpz_clear(e);

  mpz_clear(phiN);
  string d_str = mpz_get_str(NULL, 10, d);
  mpz_clear(d);
  return d_str;
}

int main() {
  cout << get_N() << "\n";
  cout << get_e() << "\n";
  cout << get_d() << "\n";
}

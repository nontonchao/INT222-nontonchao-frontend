<script setup>
import PO from "../assets/members/PO.jpg";
import Ny from "../assets/members/dev024.jpg";
import Mint from "../assets/members/dev031.jpg";
import Poom from "../assets/members/dev071.jpg";
const members = [
  {
    nname: "Khun",
    name: "Siam Yamsaengsung ",
    imagePath: PO,
    desc: "The best our advisor in this world.",
    git: "https://github.com/siam-yam",
    fb: "https://www.facebook.com/siamyam",
    ig: "",
  },
  {
    nname: "Ny",
    name: "Chokjaroen Tanjaroenrat ",
    imagePath: Ny,
    desc: "63130500024",
    git: "https://github.com/itsmeny",
    fb: "https://www.facebook.com/cjrtp",
    ig: "https://www.instagram.com/breaklby/",
  },
  {
    nname: "Mint",
    name: "Nattakan Thaweewatthanaprayun ",
    imagePath: Mint,
    desc: `63130500031`,
    git: "https://github.com/dknxsmph",
    fb: "https://www.facebook.com/dknsxmph",
    ig: "https://www.instagram.com/dknxsmph/",
  },
  {
    nname: "Poom",
    name: "Nitipoom Suttachai ",
    imagePath: Poom,
    desc: `63130500071`,
    git: "https://github.com/Nitipoom1456",
    fb: "https://www.facebook.com/Nitipoom.Sutachai",
    ig: "https://www.instagram.com/ntpm_poom/",
  },
];
</script>
<template>
  <div>
    <div style="background: #f5f5f7">
      <section class="py-4 py-xl-5" style="background: #f5f5f7">
        <section class="border bottom-dark" style="background: #ffffff">
          <nav
            class="navbar navbar-light navbar-expand-md py-3"
            style="margin: 2px"
          >
            <div class="container">
              <a class="navbar-brand d-flex align-items-center" href="#"
                ><span class="fw-bold">เกี่ยวกับเรา</span></a
              >
              <div class="collapse navbar-collapse" id="navcol-2"></div>
            </div>
          </nav>
        </section>
      </section>

      <div class="container py-4 py-xl-2">
        <div class="row mb-5">
          <div class="col-md-8 col-xl-6 text-center mx-auto">
            <h2>SY1-NONTONCHAO</h2>
            <p class="w-lg-50">พร้อมที่จะนอนแล้ว<br /></p>
          </div>
        </div>
        <section class="position-relative py-4 py-xl-1" v-show="!toggleEdit">
          <div class="container py-4 py-xl-3">
            <div class="row gy-4 row-cols-2 row-cols-md-4">
              <div class="col" v-for="(member, index) in members" :key="index">
                <div class="card">
                  <div class="p-4">
                    <img
                      class="rounded-circle card-img-top w-100 d-block fit-cover"
                      style="height: 250px"
                      :src="member.imagePath"
                    />
                  </div>

                  <div class="card-body p-4">
                    <p class="text-primary card-text">{{ member.nname }}</p>
                    <h5 class="card-title">{{ member.name }}</h5>
                    <p class="card-text">
                      {{ member.desc }}
                    </p>
                    <div class="d-flex justify-content-evenly">
                      <a :href="member.git" target="_blank"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="45"
                          height="45"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                          />
                        </svg>
                      </a>
                      <a :href="member.ig" target="_blank"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="45"
                          height="45"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                          />
                        </svg>
                      </a>

                      <a :href="member.fb" target="_blank"
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="45"
                          height="45"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: "Varela Round", sans-serif;
}

.modal-confirm {
  color: #636363;
  width: 500px;
}

.modal-confirm .modal-content {
  padding: 20px;
  border-radius: 5px;
  border: none;
  text-align: center;
  font-size: 14px;
}

.modal-confirm .modal-header {
  border-bottom: none;
  position: relative;
}

.modal-confirm h4 {
  text-align: center;
  font-size: 26px;
  margin: 30px 500px -20px;
}

.modal-confirm .close {
  position: absolute;
  top: -5px;
  right: -2px;
}

.modal-confirm .modal-body {
  color: #999;
}

.modal-confirm .modal-footer {
  border: none;
  text-align: center;
  border-radius: 5px;
  font-size: 13px;
  padding: 10px 15px 25px;
}

.modal-confirm .modal-footer a {
  color: #999;
}

.modal-confirm .icon-box {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  border-radius: 50%;
  z-index: 9;
  text-align: center;
  border: 4px solid #f15e5e;
}

.modal-confirm .icon-box i {
  color: #f15e5e;
  font-size: 46px;
  display: inline-block;
  margin-top: 13px;
}

.modal-confirm .btn,
.modal-confirm .btn:active {
  color: #fff;
  border-radius: 4px;
  background: #0071e3;
  text-decoration: none;
  transition: all 0.4s;
  line-height: normal;
  min-width: 120px;
  border: none;
  min-height: 40px;
  border-radius: 3px;
  margin: 0 5px;
}

.modal-confirm .btn-secondary {
  background: #f5f5f7;
}

.modal-confirm .btn-secondary:hover,
.modal-confirm .btn-secondary:focus {
  background: #a8a8a8;
}

.modal-confirm .btn-danger {
  background: #f15e5e;
}

.modal-confirm .btn-danger:hover,
.modal-confirm .btn-danger:focus {
  background: #ee3535;
}
</style>

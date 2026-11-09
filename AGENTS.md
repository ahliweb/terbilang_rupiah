# AGENTS.md

Instruksi untuk AI agent yang bekerja di repo ini.

## Orchestrator & Agent (model AI)

> Standar lintas-portofolio internal tentang tingkatan model AI (snapshot 2026-10-28). Harga, effort, dan lini model dipelihara di standar internal itu — jangan disalin ke repo ini.

Pekerjaan yang perlu dipecah ke beberapa agent memakai pola **orchestrator → agent**. Orchestrator memecah pekerjaan, membagi tugas, mengatur ketergantungan, lalu memeriksa dan menyatukan hasil; agent mengerjakan satu bagian yang sudah dibatasi.

| Peran | Claude Code | Codex / OpenAI |
| --- | --- | --- |
| Orchestrator | Opus 5.5, effort `high` | GPT-6.1 Sol, `high` |
| Agent kompleks — lintas komponen, keamanan, integrasi, risiko regresi | Sonnet 5.5, `medium` (subagent `pelaksana-kompleks`) | GPT-6.1 Sol atau Terra, `medium` |
| Agent sederhana — mekanis, terdefinisi jelas, risiko rendah | Haiku 5.5, `low` (subagent `pelaksana-sederhana`) | GPT-6 Luna atau Terra, `low` |

Pekerjaan kritis (arsitektur, keamanan, migrasi besar): orchestrator Fable 5.1 `high`–`xhigh`, agent kompleks Opus 5.5 `high`.

Aturan:

1. **Jangan memecah tugas kecil.** Coba satu model kuat (Opus 5.5 / GPT-6.1 Sol) dengan effort rendah lebih dulu.
2. **Naikkan, jangan menebak.** Agent sederhana yang menemukan ambiguitas, risiko, atau sentuhan arsitektur berhenti dan mengembalikan tugas ke orchestrator, yang memindahkannya ke agent kompleks.
3. **Agent paralel terisolasi.** Tidak boleh menyentuh file atau modul yang sama; tugas yang saling bergantung dijalankan berurutan.
4. **Verifikasi tetap di orchestrator.** Diff, uji, dan angka dicek sendiri sebelum dipakai; laporan agent bukan bukti.
5. **Agent tetap di scope-nya.** Tidak mengubah arsitektur, tidak mendelegasikan lagi, tidak menyentuh area di luar tugas.
6. **Aturan repo ini tetap berlaku** untuk setiap agent — alur kerja, gerbang, guardrail keamanan, konvensi commit.

<!-- BEGIN:pengetahuan-ringkas -->
<!-- pengetahuan-ringkas:v1 -->
## Knowledge Graph (graphify)

Repo ini punya knowledge graph di `graphify-out/`. Prosedur lengkap: skill `.claude/skills/pengetahuan-ringkas/SKILL.md`.

1. **Untuk pertanyaan arsitektur atau hubungan antarberkas, baca graf lebih dulu.** Buka `graphify-out/GRAPH_REPORT.md`, lalu `graphify query "<pertanyaan>"`, sebelum membuka banyak berkas satu per satu. Hemat token.
2. **Graf adalah peta, bukan sumber kebenaran.** Verifikasi setiap klaim ke `source_file` yang dikutip; edge `INFERRED`/`AMBIGUOUS` bukan fakta.
3. **Bila `graphify-out/STATUS.md` ada, graf baru berisi kode saja.** Jalankan `/graphify . --update` sebelum mengandalkannya untuk pertanyaan dokumen, hapus `STATUS.md`, lalu commit hasilnya.
4. **Perbarui graf setelah menambah, menghapus, atau mengubah substansial berkas**, dalam commit yang sama (`graphify update .` untuk kode, `/graphify . --update` untuk dokumen).
5. **Jangan edit `graphify-out/` dengan tangan** dan jangan memasang `graphify hook install`.
<!-- END:pengetahuan-ringkas -->

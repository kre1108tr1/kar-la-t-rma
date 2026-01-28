const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Kullanıcıdan veri almak için terminal arayüzünü hazırlıyoruz
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function karsilastir(yol1, yol2) {
    if (!fs.existsSync(yol1) || !fs.existsSync(yol2)) {
        console.log("\n[HATA] Klasör yollarından biri geçersiz!");
        return;
    }

    const dosyalarA = fs.readdirSync(yol1);
    
    dosyalarA.forEach(dosya => {
        const tamYolA = path.join(yol1, dosya);
        const tamYolB = path.join(yol2, dosya);

        if (!fs.existsSync(tamYolB)) {
            console.log(`[EKSİK] Kontrol edilecek klasörde yok: ${dosya}`);
        } else {
            const istatistikA = fs.lstatSync(tamYolA);
            if (istatistikA.isDirectory()) {
                karsilastir(tamYolA, tamYolB);
            }
        }
    });
}

// SORU SORMAYA BAŞLIYORUZ
console.log("=== Klasör Karşılaştırıcıya Hoş Geldin ===\n");

rl.question('Ana klasörünün yolunu yapıştır: ', (yolA) => {
    rl.question('Kontrol edilecek klasör yolunu yapıştır: ', (yolB) => {
        
        console.log("\nKarşılaştırma başlıyor...\n");
        karsilastir(yolA.trim(), yolB.trim());
        
        console.log("\nİşlem bitti. Çıkmak için bir tuşa bas.");
        // Programın hemen kapanmaması için tekrar soru soruyormuş gibi yapıyoruz
        rl.on('line', () => {
            process.exit();
        });
    });
});
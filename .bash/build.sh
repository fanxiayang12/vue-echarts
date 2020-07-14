cd ../
yarn
yarn build

rm -rf ../emdata-rule-sping/emdata-rule-boot/src/main/resources/public
cp -R ./dist/ ../emdata-rule-sping/emdata-rule-boot/src/main/resources/public/
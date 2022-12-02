const main = async () => {
  const date = new Date().getDate()
  const moduleOfTheDay = await import(`./day${date}/index.js`)

  await moduleOfTheDay.main()
}

main().catch(console.error)

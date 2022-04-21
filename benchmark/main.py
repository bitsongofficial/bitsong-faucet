import requests
import threading
import time

addresses = [
"bitsong1072ylnyz4sjnlsk5q2qtqqkftdlfwek0080f6p",
"bitsong19qy8lcr20p35j0nme8rng67xrhxpk2jmlypm6y",
"bitsong1g538x8d7ypn5jj4g78dyml4kfdrc8rptnees07",
"bitsong1s9z4vttx6p63gcze24duu9mpj9v29ctxv0u9uz",
"bitsong14myhksa8hsa2h3tduy535j2srddx54hadrr03v",
"bitsong1lky3kaxeajgfnakwh8f6pcd0mr77d8ht47fh8d",
"bitsong1tq4973vle0wn2y43g06nzwjrdrulzrzlvh5dzg",
"bitsong1dm5lqv345lnqf9t8jvaft0tnfgahzrzkknwr6c",
"bitsong122qmfuuujapu359d975h8qzcds2prssh7a3l70",
"bitsong1xw79afn6ue65qa0f592snhu0usweugyx6k9acq",
"bitsong1h2cs4py349m2j3ra2k85wkcffpfztqw8rgchan",
"bitsong1laj23uelt20tp37y9r6mt6mtzktn73cq65rcya",
"bitsong1jcaa2lky7xe9esgdnfnr82uswanq9lve6qgh8d",
"bitsong18dkuwmh8xc0yyyfp409r0lw369khh8cr6h96cq",
"bitsong1d62sxgp7ywerh503m7xrsu20h3cg8qlzkx069z",
"bitsong19xgmxx40zpktcxvc6ltmadgktn2dhctfugxmz5",
"bitsong1c8ypchv4dzlz090qh5h8jkmt6fmu4km8sfy9ek",
"bitsong1few0mejsnc7qeak3pwr79q0xc6p05a4kuxk489",
"bitsong1dqudu72vfanlfe8r38929cqhm2atndcx6z5jea",
"bitsong1c2pggckz6tsktln7vkpfqytm44zkmv6k62y5re",
"bitsong1y5l4kg5x362ck6hqz68mrxtkkkr8yslrmp7ye3",
"bitsong1pn6mhrwq8vdhns366jwxkggmhmxypuhrzuf7vp",
"bitsong1yv2ecqa6fp0rzpcfutk425g5nj7nzuenfy5q0l",
"bitsong1yay87g5p3nu5yxvm2lh3kcfxk62wsar9n53va0",
"bitsong1judrrhl69n9eq9xnre6zlhx3rawf2v3w8h02h2",
"bitsong174j2jqt2lkltnu3swgycg7j08pn300zhuelkaf",
"bitsong1gtqnpz50f7408a95wvvakf9pfxfh2u6cc42duj",
"bitsong1uuamq0yfshxqk30t9gqn48kgq75zr4kpk5plju",
"bitsong1v99k54h2g3v00j7j52efuz3pgpex7v6ecwgnz0",
"bitsong18g6vuwpwl45hr3zwmjm9ftjtey2rwtvn35t3ez",
"bitsong18q57k6c4wt9fdm7829hgn5jj30s8sf0mphva03",
"bitsong1upstx0yjyjwtqev06jpkdcemn2yarnv3sex7z6",
"bitsong12kw95mx4zamcdgj08mdq08q24s7wh5u52cadvg",
"bitsong1x49h43eaantenyfqfq9fu3t7z37427308c5aa0",
"bitsong1zdht8zshum4xk4v6x6rprk2k67ylms7evxkx8e",
"bitsong12q6eemn7pqur48086k6h3pfgy3w6nzzq7qpgxn",
"bitsong1388frtw5plkyzaa9r7ert62n5talf427dkyntv",
"bitsong14567r4kud9krmhkzw75j7xznxyuv07sjmfr7ac",
"bitsong1mzxfjk9uwrv4em6nkmm8ux62sthyznu2pdm0n2",
"bitsong1n0h54c882xqalqeks8vy45ftl2w74naqjevq0c",
"bitsong15wfxrvameuy355c484exak9yl8nksxjw4kjcee",
"bitsong1uu2kfp4fp7hjyaydayx58n3ht85e8h2ys08ax0",
"bitsong1vm98ycvspsf7r4w735evwm5rwcxshayr5jc837",
"bitsong142327w6eayyzx8na759fpvtnq7d4qn2z9e3yte",
"bitsong1w9gzxdv7yg46jhsfq90mee40mu6h9sw62gtkvp"
]

amount = 1000
request_amount = 2

def getFaucet(address):
    url = "http://localhost:8000/?address="+address
    for i in range(request_amount):
        r =requests.get(url)
        print(r.status_code)

start = time.perf_counter()
threads = []

for address in addresses:
    t = threading.Thread(target=getFaucet, args=[address])
    t.start()
    threads.append(t)

for thread in threads:
    thread.join()

finish = time.perf_counter()
print(f'Finished in {round(finish-start, 2)} seconds')

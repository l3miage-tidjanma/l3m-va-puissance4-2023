import {SerializedMutant, TestCase, TestCaseResult, TestSuite} from "./data/tests-definitions";
import {FirestoreDataConverter, WithFieldValue} from "@angular/fire/firestore";
import {play} from "./data/play";
import {NgZone} from "@angular/core";
import {Observable, OperatorFunction} from "rxjs";

export const logins: readonly string[] = [
  "alexandre.demeure@univ-grenoble-alpes.fr", "sybille.caffiau@univ-grenoble-alpes.fr",
  "abakar.abdraman@etu.univ-grenoble-alpes.fr",
  "rochdy.ait-el-kebir@etu.univ-grenoble-alpes.fr",
  "eylul.alptekin@etu.univ-grenoble-alpes.fr",
  "ibrahim.alsabr@etu.univ-grenoble-alpes.fr",
  "higo.aragao-oliveira-medeiros@etu.univ-grenoble-alpes.fr",
  "mohamed.badzi@etu.univ-grenoble-alpes.fr",
  "elhadj.bah@etu.univ-grenoble-alpes.fr",
  "ibrahima.barry2@etu.univ-grenoble-alpes.fr",
  "rami.belguith@etu.univ-grenoble-alpes.fr",
  "mahmoud.benammar@etu.univ-grenoble-alpes.fr",
  "sami.bensaid@etu.univ-grenoble-alpes.fr",
  "mustapha-mahrez.bouchelouche@etu.univ-grenoble-alpes.fr",
  "nour-el-houda.bouguessa@etu.univ-grenoble-alpes.fr",
  "rafik.boukhemiri@etu.univ-grenoble-alpes.fr",
  "andy.bouquety@etu.univ-grenoble-alpes.fr",
  "bastien.campus@etu.univ-grenoble-alpes.fr",
  "ludovic.candela-guilabert@etu.univ-grenoble-alpes.fr",
  "hamza.cherkaoui1@etu.univ-grenoble-alpes.fr",
  "n-djo-soro.coulibaly@etu.univ-grenoble-alpes.fr",
  "mamadou.diallo4@etu.univ-grenoble-alpes.fr",
  "zichen.ding@etu.univ-grenoble-alpes.fr",
  "ernesto.dominguez-montesino@etu.univ-grenoble-alpes.fr",
  "loic.dumas@etu.univ-grenoble-alpes.fr",
  "hafid.el-gana@etu.univ-grenoble-alpes.fr",
  "ismail.el-bouch@etu.univ-grenoble-alpes.fr",
  "alessandro.farina@etu.univ-grenoble-alpes.fr",
  "driss.gentil@etu.univ-grenoble-alpes.fr",
  "maceo.gondre@etu.univ-grenoble-alpes.fr",
  "achraf.gounadfa@etu.univ-grenoble-alpes.fr",
  "angelica-rivera.grasia@etu.univ-grenoble-alpes.fr",
  "teddie.gregoire@etu.univ-grenoble-alpes.fr",
  "rayane.haddad@etu.univ-grenoble-alpes.fr",
  "abdelkoddous.hounkara@etu.univ-grenoble-alpes.fr",
  "manal.ifegh@etu.univ-grenoble-alpes.fr",
  "mohammed.kaddour@etu.univ-grenoble-alpes.fr",
  "ahmed.karmous@etu.univ-grenoble-alpes.fr",
  "cire.keita@etu.univ-grenoble-alpes.fr",
  "cedrix.kengni@etu.univ-grenoble-alpes.fr",
  "myriam.khaddar@etu.univ-grenoble-alpes.fr",
  "ibrahim-goukouni.khalil@etu.univ-grenoble-alpes.fr",
  "elian.lawriw@etu.univ-grenoble-alpes.fr",
  "xiaoman.liu@etu.univ-grenoble-alpes.fr",
  "yassine.mahri@etu.univ-grenoble-alpes.fr",
  "sami.mansour@etu.univ-grenoble-alpes.fr",
  "hippolyte-djecomde.mbayam@etu.univ-grenoble-alpes.fr",
  "nils.miel@etu.univ-grenoble-alpes.fr",
  "vivian.monachon@etu.univ-grenoble-alpes.fr",
  "basma.morabit@etu.univ-grenoble-alpes.fr",
  "nihad.mouadna@etu.univ-grenoble-alpes.fr",
  "almahdi.mouhammad@etu.univ-grenoble-alpes.fr",
  "nassima.moumou@etu.univ-grenoble-alpes.fr",
  "blaste.mulamba@etu.univ-grenoble-alpes.fr",
  "mona.osman@etu.univ-grenoble-alpes.fr",
  "anouer.ouerghi@etu.univ-grenoble-alpes.fr",
  "yacine.oukkal@etu.univ-grenoble-alpes.fr",
  "jugurta.ourzik@etu.univ-grenoble-alpes.fr",
  "baran.ozyonum@etu.univ-grenoble-alpes.fr",
  "willem.papeau@etu.univ-grenoble-alpes.fr",
  "adrien.pichoud@etu.univ-grenoble-alpes.fr",
  "lorenzo.porcu@etu.univ-grenoble-alpes.fr",
  "imen.rahmani@etu.univ-grenoble-alpes.fr",
  "mohamed.sbartai@etu.univ-grenoble-alpes.fr",
  "matteo.severini@etu.univ-grenoble-alpes.fr",
  "alireza.seyf@etu.univ-grenoble-alpes.fr",
  "lola.tosetto@etu.univ-grenoble-alpes.fr",
  "manyl.tidjani@etu.univ-grenoble-alpes.fr",
  "thi-van-anh.tran@etu.univ-grenoble-alpes.fr",
  "sylvain.tuyishimire@etu.univ-grenoble-alpes.fr",
  "mariam.fathallah@etu.univ-grenoble-alpes.fr",
];

export async function evalMutant(mutant: SerializedMutant<any>, Ltcts: { ts: TestSuite, tc: TestCase }[]): Promise<{ ts: TestSuite, tcr: TestCaseResult }[]> {
  const Ltc = Ltcts.map(({tc}) => tc);
  const worker = new Worker(new URL('./eval-mutant.worker', import.meta.url));
  return new Promise<{ ts: TestSuite, tcr: TestCaseResult }[]>(resolve => {
    const timer = setTimeout(
      async () => {
        worker.terminate();
        if (Ltcts.length === 1) {
          const {ts, tc} = Ltcts[0];
          resolve([{ts, tcr: {...tc, pass: false, result: {exec: "failed", reason: "timeout"}}}]);
        } else {
          // Try one by one
          console.error("mutant test timeout, try one by one:", mutant, Ltcts);
          const L = await Promise.all(Ltcts.map(tcts => evalMutant(mutant, [tcts])));
          resolve(L.flatMap(l => l));
        }
      },
      1000
    );

    // Subscribe to worker response
    worker.onmessage = (evt: MessageEvent<TestCaseResult[]>) => {
      clearTimeout(timer);
      const Ltcr = evt.data;
      resolve(Ltcr.map((tcr, i) => ({tcr, ts: Ltcts[i].ts})));
    };

    // Send list to process seriMutant
    const msg: { Ltc: TestCase[], seriMutant: SerializedMutant<any> } = {Ltc, seriMutant: mutant};
    worker.postMessage(msg)
  });

}

export function evalTestsLocally(Lt: readonly TestCase[]): Promise<readonly TestCaseResult[]> {
  return new Promise<readonly TestCaseResult[]>(resolve => {
    const worker = new Worker(new URL('./test-case.worker', import.meta.url));
    const timer = setTimeout(
      async () => {
        worker.terminate();
        if (Lt.length === 1) {
          resolve([{...Lt[0], pass: false, result: {exec: "failed", reason: "timeout"}}]);
        } else {
          // Try one by one
          console.error("timeout... try one by one:", Lt);
          const L = await Promise.all(Lt.map(t => evalTestsLocally([t])));
          resolve(L.flatMap(lt => lt))
        }
      },
      1000
    )
    worker.onmessage = (evt: MessageEvent<readonly TestCaseResult[]>) => {
      clearTimeout(timer);
      resolve(evt.data);
    };
    worker.postMessage(Lt);
  });
}

export interface FS_TestSuite {
  id: string;
  label: string;
  LtestIds: string[];
}

export const TestSuiteConverter: FirestoreDataConverter<FS_TestSuite> = {
  toFirestore: ts => ts,
  fromFirestore: d => d.data() as FS_TestSuite,
}
export const TestCaseConverter: FirestoreDataConverter<TestCase> = {
  toFirestore: tc => {
    const obj: any = {...tc};
    if (tc.params) {
      obj['params'] = JSON.stringify(tc.params)
    }
    const expectPlay = tc.expect as ReturnType<typeof play>;
    if (expectPlay.success) { //if defined as true
      obj['expect']['state'] = JSON.stringify(expectPlay.state);
    }
    return obj;
  },
  fromFirestore: d => {
    const data = d.data();
    if (data['expect']?.['state']) { //if defined as true
      data['expect']['state'] = JSON.parse(data['expect']['state']);
    }
    return {...data, id: d.id, params: JSON.parse(data['params'])} as TestCase
  },
};

export interface STAT<T> {
  play: T;
  isValid: T;
  winner: T;
}

export interface FS_User {
  email: string;
  mutants: string[];
  testsVersion: number;
  canObserve?: string;
  evals: [
    version: number,
    testsVersusCoderef: STAT<[pass: number, total: number]>,
    testsVersusMutants: STAT<[eliminate: number, total: number]>,
  ]
}

export const UserConverter: FirestoreDataConverter<FS_User> = {
  toFirestore: (U: WithFieldValue<FS_User>) => U,
  fromFirestore: U => ({
    email: U.id,
    canObserve: U.get("canObserve") ?? "[]",
    mutants: U.get("mutants") ?? [],
    testsVersion: U.get("testsVersion") ?? 0,
    evals: U.get("evals") ?? [
      -1,
      {play: [0,0], isValid: [0,0], winner: [0,0]},
      {play: [0,0], isValid: [0,0], winner: [0,0]},
    ] // satisfies FS_User["evals"]
  } as FS_User)
}

export interface LocalSave {
  readonly userMail: string;
  readonly version: number;
  readonly testSuites: readonly TestSuite[]
}




export function runInZone<T>(zone: NgZone): OperatorFunction<T, T> {
  return (source) => {
    return new Observable(observer => {
      const onNext = (value: T) => zone.run(() => observer.next(value));
      const onError = (e: any) => zone.run(() => observer.error(e));
      const onComplete = () => zone.run(() => observer.complete());
      return source.subscribe(onNext, onError, onComplete);
    });
  };
}

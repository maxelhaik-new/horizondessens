import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContents } from "@/content/get-content";
import { getReviews } from "@/reviews/get-reviews";

/** §8 Avis Google — masqué tant qu'aucun vrai avis n'est disponible. */
export async function Reviews() {
  const [reviews, c] = await Promise.all([
    getReviews(),
    getContents(["home.avis.title"] as const),
  ]);
  if (reviews.length === 0) return null;

  return (
    <section className="bg-sand/20 section-y">
      <div className="container-site">
        <SectionHeading
          title={c["home.avis.title"]}
          edit={{ title: c.edit("home.avis.title") }}
        />
        <RevealGroup
          as="ul"
          className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6"
        >
          {reviews.slice(0, 3).map((review) => (
            <RevealItem
              as="li"
              key={`${review.author}-${review.date ?? ""}`}
              className="flex flex-col gap-5 rounded-card bg-paper-soft p-6 md:p-8"
            >
              <p
                aria-label={`Note : ${review.rating} sur 5`}
                className="text-accent-500"
              >
                {"★".repeat(Math.round(review.rating))}
              </p>
              <blockquote className="text-body text-pretty">
                « {review.text} »
              </blockquote>
              <p className="text-sm font-medium">{review.author}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
